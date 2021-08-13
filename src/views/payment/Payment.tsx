/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import "../../assets/scss/views/payment.scss"
// STAFF
import Branch, { BranchContainer, BranchHeader, BranchSection, BranchSidebar } from "../../app/components/formatting/branch"
import { Component, ComponentProps, Fragment, useState } from "react"
import { classWithModifiers, getBonusImage, scrollIntoView } from "../../resources/utils"
import Input from "../../app/components/UI/Input"
import Button from "../../app/components/UI/Button"
import { QueryContext, QueryContextResponse, QueryCunsumer } from "../../app/components/other/MutuableQuery"
import { fetchPaymentBonuses, fetchPaymentCreate, fetchPaymentPromocode } from "../../app/api/actions"
import Translation, { Translate } from "../../app/controllers/Translation"
import useTranslation from "resources/hooks/useTranslation"
import { ClientAPI } from "app/api/client"
import { debounce } from "resources/utils/snippets"
import NumberFormat from "react-number-format"
export interface PaySystemProps {
  title?: string
  image: string
  send: {
    type: "UNITPAY" | "GAMEMONEY" | "QIWI" | "YOOMONEY" | "FREEKASSAOLD"
    method: string
  }
}
interface PaymentState {
  page: "method" | "bonus" | "promocode"
  method: PaySystemProps | null
  bonusId: number | null
  promocode: string | number | null
  phone?: number
  sum: number
}
class QueryContextComponent<P = {}, S = {}, SS = {}> extends Component<P, S, SS> {
  static contextType = QueryContext
  context!: QueryContextResponse<typeof fetchPaymentBonuses>
}
// TODO: Refactor EVERYTHING
class Payment extends QueryContextComponent<{}, PaymentState> {
  trans = Translate(trans => trans.views.payment)

  menu = this.trans.menu

  payments: PaySystemProps[] = [
    {
      title: this.trans.pages?.method?.methods?.first,
      image: "cards",
      send: {
        type: "YOOMONEY",
        method: "card"
      }
    },

    {
      title: this.trans.pages?.method?.methods?.second,
      image: "cards",
      send: {
        type: "GAMEMONEY",
        method: "card"
      }
    },

    {
      title: "USD",
      image: "usd",
      send: {
        type: "GAMEMONEY",
        method: "card-usd"
      }
    },
    {
      title: "EUR",
      image: "eur",
      send: {
        type: "GAMEMONEY",
        method: "card-eur"
      }
    },

    {
      // title: this.trans.pages?.method?.methods?.QIWI,
      image: "qiwi",
      send: {
        type: "QIWI",
        method: "qiwi"
      }
    },

    {
      image: "yandex_money",
      send: {
        type: "YOOMONEY",
        method: "yandex"
      }
    },

    {
      image: "apple_pay",
      send: {
        type: "YOOMONEY",
        method: "card"
      }
    },

    // {
    //   image: "samsung_pay",
    //   send: {
    //     type: "UNITPAY",
    //     method: "samsungpay"
    //   }
    // },

    {
      title: "WMZ",
      image: "wmz",
      send: {
        type: "GAMEMONEY",
        method: "wmz"
      }
    },

    {
      image: "scp_footer",
      title: "Steam",
      send: {
        type: "FREEKASSAOLD",
        method: "steam"
      }
    },

    {
      image: "mts",
      send: {
        type: "YOOMONEY",
        method: "mobile"
      }
    },

    // {
    //   image: "tele2",
    //   send: {
    //     type: "FREEKASSAOLD", // Change
    //     method: "tele2"
    //   }
    // },

    {
      image: "megafon",
      send: {
        type: "FREEKASSAOLD", // Change
        method: "megafon"
      }
    },

    {
      image: "beeline",
      send: {
        type: "FREEKASSAOLD", // Change
        method: "beeline"
      }
    },

    {
      image: "ethereum",
      send: {
        type: "GAMEMONEY",
        method: "ethereum"
      }
    },

    {
      image: "bitcoin",
      send: {
        type: "GAMEMONEY",
        method: "bitcoin"
      }
    },

    {
      image: "psb",
      send: {
        type: "GAMEMONEY",
        method: "promsviaz"
      }
    },

    // {
    //   image: "sberbank",
    //   send: {
    //     type: "GAMEMONEY",
    //     method: "sberbank"
    //   }
    // },

    {
      image: "alfa_bank",
      send: {
        type: "GAMEMONEY",
        method: "alfabank"
      }
    },
  ]

  state: PaymentState = {
    page: "method",
    method: null,
    bonusId: null,
    promocode: null,
    sum: window.history?.state?.state?.condition || 100
  }

  render() {
    this.trans = Translate(trans => trans.views.payment)

    return (
      <Branch id="payment" className="payment">
        <BranchSidebar>
          <div className="payment-nav">
            {(Object.keys(this.menu || {}) as this["state"]["page"][]).map((pageKey: this["state"]["page"], index) => {
              const page = this.menu?.[pageKey]
              const active = this.state.page === pageKey
              let disabled = pageKey !== "method" && !this.state.method
              if (!active) {
                if (pageKey === "bonus") {
                  if (this.state.promocode) disabled = true
                  if (this.skipBonus) disabled = true

                }
                if (pageKey === "promocode") {
                  if (this.state.bonusId) disabled = true
                }
              }
              return (
                <div className={classWithModifiers("payment-nav__link", [active && "active", disabled && "disabled"])} onClick={this.setPage(pageKey as any)} key={"payment_link_" + index}>{page}</div>
              )
            })}
          </div>
        </BranchSidebar>
        <BranchSection flex="unset">
          <BranchHeader {...this.trans.pages?.[this.state.page]} />
          <BranchContainer>
            {this.state.page === "method" && this.renderMethod()}
            {this.state.page === "bonus" && this.renderBonus()}
            {this.state.page === "promocode" && this.renderPromocode()}

            {/* <div className="payment-bottom">
              {this.state.page === "method" && !this.state.method && (
                <Button className="payment-bottom__button" disabled>{this.trans.buttons?.chooseMethod}</Button>
              )}
              {this.state.page === "method" && this.state.method && (
                <Button className="payment-bottom__button" onClick={this.setPage("bonus")}>{this.trans.buttons?.submit}</Button>
              )}
              {this.state.page === "bonus" && !this.state.bonusId && (
                <Button className="payment-bottom__button" onClick={this.setPage("promocode")}>{this.trans.buttons?.usePromocode}</Button>
              )}
              {this.state.page === "promocode" && !this.state.promocode && (
                <Button className="payment-bottom__button" onClick={() => this.submit()}>{this.trans.buttons?.submit} {this.trans.buttons?.noPromocode}</Button>
              )}
            </div> */}
          </BranchContainer>
        </BranchSection>
      </Branch>
    )
  }

  renderMethod() {
    const Bottom = (props: any) => this.renderBottom(props)
    const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.currentTarget
      const sum = Number(target.value)
      if (sum < 1 || !target.value) {
        this.setState({ sum: 1 })
        target.value = "1"
        return
      }
      this.setState({ sum })
    }
    return (
      <Fragment>
        <div className="pay-systems">
          {this.payments.map((payment, index) => (
            <div
              key={"system_" + index}
              children={<PaySystem {...payment} />}
              onClick={this.setMethod(payment)}
              className={classWithModifiers("pay-systems__system", [this.state.method === payment && "selected"])} />
          ))}
        </div>
        <p className="payment__text">{this.trans.pages?.method?.text}</p>
        <div className="payment-sum">
          <h2 className="payment-sum__title">{this.trans.pages?.method?.sum}</h2>
          <Input type="number" color="white" icon={Translation.get().currency.symbol} iconColor="broom" width="5em" defaultValue={this.state.sum} onBlur={onInput} />
        </div>
        {this.state.method?.send?.method === "mobile" && (
          <div className="payment-sum">
            <h2 className="payment-sum__title">{this.trans.pages?.method?.mobile}</h2>
            <PhoneInput required style={{ width: "15em" }} onChange={(event: any) => this.setState({ phone: event?.currentTarget?.value || null })} />
            <span className="payment__text" style={{ margin: "1em" }}>(С кодом страны, 7 для России, без 8)</span>
          </div>
        )}
        <Bottom>
          {!this.state.method && <Button disabled className="payment-bottom__button">{this.trans.buttons?.chooseMethod}</Button>}
          {this.state.method && <Button className="payment-bottom__button" onClick={this.setPage("bonus")}>{this.trans.buttons?.submit}</Button>}
        </Bottom>
      </Fragment>
    )
  }

  bonuses = Translate(trans => trans.bonuses)

  get skipBonus() {
    if (this.context.payload.length <= 0) {
      return true
    }

    if (this.context.payload.filter(bonus => bonus.item.condition <= this.state.sum).length <= 0) {
      return true
    }

    return false
  }

  renderBonus() {
    if (this.skipBonus) {
      this.setState({ page: "promocode" })
    }
    const Bottom = (props: any) => this.renderBottom(props)
    return (
      <>
        <QueryCunsumer<typeof fetchPaymentBonuses>>
          {({ payload }) => {
            const bonusesCount: Record<number, number> = {}
            const bonuses = payload.filter(bonus => {
              const prevCount = bonusesCount[bonus.item.id]
              const currCount = bonusesCount[bonus.item.id] = (prevCount || 0) + 1

              if (currCount >= 2) {
                return false
              }

              if (this.state.sum < bonus.item.condition) {
                return false
              }

              return true
            })

            return (
              <div className="payment-bonuses">
                {bonuses.map((bonus, index) => (
                  <div className={classWithModifiers("payment-bonuses__bonus", [bonus.item.id === this.state.bonusId && "active"])} onClick={() => this.setBonusId(bonus.item.id)} key={"bonus_" + index}>
                    <img src={getBonusImage(bonus.item.id)} alt="bonus" className="payment-bonuses__image" />
                    <div className="payment-bonuses__title">{this.bonuses.list?.[bonus.item.id]?.title}</div>
                    <div className="payment-bonuses__count">{bonusesCount[bonus.item.id]}</div>
                  </div>
                ))}
              </div>
            )
          }}
        </QueryCunsumer>
        <Bottom>
          {!this.state.bonusId && (
            <Button className="payment-bottom__button" onClick={this.setPage("promocode")}>{this.trans.buttons?.submit} {this.trans.buttons?.noBonus}</Button>
          )}
          {Boolean(this.state.bonusId) && (
            <Button className="payment-bottom__button" onClick={() => this.submit()}>{this.trans.buttons?.submit}</Button>
          )}
        </Bottom>
      </>
    )
  }

  renderPromocode() {
    const Bottom = (props: any) => this.renderBottom(props)
    return (
      <>
        <Promocode onChange={promocode => this.setState({ promocode })} />
        <Bottom>
          <Button className="payment-bottom__button" onClick={() => this.submit()}>{this.trans.buttons?.submit} {!this.state.promocode && " " + this.trans.buttons?.noPromocode}</Button>
        </Bottom>
      </>
    )
  }

  renderBottom({ children }: { children: any }) {
    return (
      <div className="payment-bottom">
        {children}
      </div>
    )
  }

  setPage(page: PaymentState["page"]) {
    return () => {
      this.setState({ page }, () => {
        setTimeout(() => scrollIntoView("payment", false), 1)
      })
    }
  }

  setMethod(method: PaymentState["method"]) {
    return () => {
      this.setState({ method })
    }
  }

  setBonusId(bonusId: PaymentState["bonusId"]) {
    this.setState({ bonusId: this.state.bonusId === bonusId ? null : bonusId })
  }

  submit() {
    if (this.state.method) {
      const dataToSend = this.state.method.send
      ClientAPI
        .query(fetchPaymentCreate({
          ...dataToSend,
          amount: this.state.sum,
          bonus: this.state.bonusId || undefined,
          promocode: this.state.promocode || undefined,
          phone: this.state.phone || undefined
        }))
        .then(({ error, payload }) => {
          if (error || !payload) return

          window.location = payload.url as any
          // const link = payload.url
          // const a = document.createElement("a")
          // a.setAttribute('href', link)
          // a.setAttribute('target', '_blank')
          // a.click()
          // window.open(payload.url)
        })
    }
  }
}

function Promocode({ onChange }: { onChange: (value: string | number) => void }) {
  const [percent, setPercent] = useState(0)
  const payment = useTranslation(trans => trans.views.payment)
  function getPromocodePercent(promocode: string | number) {
    ClientAPI
      .query(fetchPaymentPromocode(promocode))
      .then(({ payload }) => {
        onChange(promocode)
        setPercent(payload?.percent || 0)
      })
  }
  return (
    <div className="payment-promo">
      <Input style={{ textTransform: "uppercase" }} color="white" width="20em" onChange={debounce(event => getPromocodePercent(event.target.value), 600)} placeholder={payment.placeholder} />
      <div className="payment-promo-bar">
        <div className="payment-promo-bar__progress" style={{ width: percent + "%" }} />
        <div className="payment-promo-bar__inner">
          <span>{payment.pages?.promocode?.progressBarText}</span>
          <em>+{percent}%</em>
        </div>
      </div>
    </div>
  )
}

export function PaySystem({ title, image }: PaySystemProps) {
  const Image = require("../../assets/images/pay_systems/" + image + ".png")
  return (
    <>
      {title && <span className="pay-systems__note">{title}</span>}
      <img src={Image.default} alt={title || image} className="pay-systems__image" />
    </>
  )
}

const phoneFormats: {
  [country: number]: string
} = {
  7: "+7 (###) ### ##-##",
  8: "8 (###) ### ##-##",
  375: "+375-## ### ##-##",
  380: "+380 (##) ### ##-##",
  998: "+998-## ### ##-##"
}

function PhoneInput(props: any) {
  // function PhoneFormat(value: any) {
  //   value = String(value).replace(/\D/g, '');
  //   // Step 1
  //   let match = /\d{1}/.exec(String(value))
  //   let removy = Number(match)
  //   let format = phoneFormats[removy]
  //   let result = format
  //   let hasSymbol: any
  //   // let asd
  //   // Step 2
  //   if (!match || !format) {
  //     match = /\d{3}/.exec(String(value))
  //     removy = Number(match)
  //     format = phoneFormats[removy]
  //     result = format
  //   }
  //   // console.log(value, match, format);
  //   if (!format) {
  //     result = '+# (###) ### ##-##'
  //     for (let i = 0; i < value.length; i++) {
  //       result = result.replace('#', value[i])
  //     }
  //   } else {
  //     for (let i = 0; i < value.length; i++) {
  //       if (String(match)[i]) continue
  //       result = result.replace('#', value[i])
  //     }
  //   }

  //   props.onChange && props.onChange(value)

  //   return result.replace(/#/g, '_')
  // }
  return (
    <label className="input">
      <NumberFormat className="input__input" {...props} format={"+# (###) ### ##-##"} />
    </label>
  )
}

export default Payment
