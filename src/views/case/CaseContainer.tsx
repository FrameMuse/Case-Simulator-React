import CaseComponent from "./CaseComponent"
import Game from "app/components/Standoff/Game"
import CaseScrolling from "views/case/CaseScrolling"
import SelectorPoints from "app/components/UI/SelectorPoints"
import ButtonTool from "app/components/UI/ButtonTool"
import Button from "app/components/UI/Button"
import { classWithModifiers, getCaseImage } from "resources/utils"
import Error from "app/components/other/Error"

class CaseContainer extends CaseComponent {
  render() {
    if (this.state.error) {
      return (
        <div className="case-page">
          <Error {...this.state.error} onClick={() => this.open()} />
        </div>
      )
    }

    // if (this.state.loading) {
    //   return (
    //     <div className="case-page">
    //       <Loader />
    //     </div>
    //   )
    // }

    return (
      <div className="case-page">
        <div className="case-page__content">
          {this.state.status === "waiting" && this.renderPreview()}
          {this.state.status === "running" && this.renderScrolling()}
          {this.state.status === "finished" && this.renderFinal()}
        </div>
      </div>
    )
  }

  setMultiplier = (multiplier: number) => this.setState({ multiplier })
  renderPreview() {
    const Case = this.case
    const { loading } = this.state
    const modifiers: string[] = []
    return (
      <div className="case-page-preview">
        <div className="case-page-preview__preview">
          <img src={getCaseImage(this.props.id)} alt="case" className={classWithModifiers("case-page-preview__image", modifiers)} />
          {modifiers.includes("locked") && (
            <div className="case-page-lock">
              <span className="case-page-lock__icon icon" />
            </div>
          )}
        </div>
        <div className="case-page-preview__buttons">
          <ButtonTool disabled={loading} padding="1.25em" color="yellow" keyPress="Enter" onClick={() => this.open()}>{this.trans.buttons?.open}</ButtonTool>
          {this.cost > 0 && (
            <Button color="green" className="case-page-preview__price" style={{ width: (Case.price * this.multiplierOptions.slice(-1)[0]).toPrice().length * 2 + "ch" }}>{this.cost.toPrice()}</Button>
          )}
          <ButtonTool disabled={loading} padding="1.25em" color="yellow" keyPress={["f", "а"]} onClick={() => this.open(true)}>{this.trans.buttons?.openFast}</ButtonTool>
        </div>
        {Case.price > 0 && (
          <div className="case-page__multiple">
            <em>{this.trans.multipleText}</em>
            <SelectorPoints
              options={this.multiplierOptions}
              onSelect={this.setMultiplier}
            />
          </div>
        )}
      </div>
    )
  }

  renderScrolling() {
    return (
      <CaseScrolling onScrollingEnd={() => this.finish()} {...this.case} {...this.state} />
    )
  }

  sellDrop(id: number) {
    if (this.state.drops.length <= 1) {
      this.wait()
    } else {
      this.setState(state => ({
        drops: state.drops.filter(drop => drop.id !== id),
      }))
    }

  }
  onExit = () => {
    this.wait()
  }
  onSellDrop = (id: number) => {
    this.sellDrop(id)
  }
  renderFinal() {
    return (
      <Game.Final
        drops={this.state.drops}
        onExit={this.onExit}
        onSellDrop={this.onSellDrop}
      />
    )
  }
}

export default CaseContainer