/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

// SCSS
import { Component, ReactElement } from "react"
import "../../../assets/scss/components/features.scss"

interface FeatureProps {
  title: string
  icon: any
}

interface FeaturesProps {
  children: ReactElement<FeatureProps>[]
}

export class features extends Component<FeaturesProps> {
  render() {
    return (
      <div className="features">
        <div className="features__container">
          {this.props.children.map(({ props: feature }, index) => (
            <div className="features__feature" key={"feature_id_" + index}>
              <div className="features__circle">
                <div className="features__icon">{feature.icon}</div>
              </div>
              <span className="features__text">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  static Feature(props: FeatureProps) {
    return null
  }
}

export default features

