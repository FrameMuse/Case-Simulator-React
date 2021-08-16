import CaseComponent from "./CaseComponent"
import CaseScrolling from "views/case/CaseScrolling"
import SelectorPoints from "app/components/UI/SelectorPoints"
import ButtonTool from "app/components/UI/ButtonTool"
import Button from "app/components/UI/Button"
import { classWithModifiers, getCaseImage } from "resources/utils"
import CaseFinal from "./CaseFinal"

class CaseContainer extends CaseComponent {
  render() {
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
          <ButtonTool disabled={loading} padding="1.25em" color="yellow" keyPress="Enter" onClick={() => this.run()}>{this.trans.buttons?.open}</ButtonTool>
          {this.cost > 0 && (
            <Button color="green" className="case-page-preview__price" style={{ width: (Case.price * this.multiplierOptions.slice(-1)[0]).toPrice().length * 2 + "ch" }}>{this.cost.toPrice()}</Button>
          )}
          <ButtonTool disabled={loading} padding="1.25em" color="yellow" keyPress={["f", "а"]} onClick={() => this.finish()}>{this.trans.buttons?.openFast}</ButtonTool>
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
      <CaseScrolling
        drops={this.state.drops}
        weapons={this.props.weapons}
        onScrollingEnd={() => this.finish()} />
    )
  }

  renderFinal() {
    return <CaseFinal drops={this.state.drops} onExit={() => this.reset()} />
  }
}

export default CaseContainer