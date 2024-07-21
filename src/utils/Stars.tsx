import { BackgroundObject } from '../App'

export const Stars = ({ starBackground }: { starBackground: BackgroundObject }) => {
  if (starBackground.moving) {
    return (
      <div id="space">
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
      </div>
    )
  } else if (starBackground.staticBackground) {
    return (
      <div id="space">
        <div className="stars-static"></div>
        <div className="stars-static"></div>
        <div className="stars-static"></div>
        <div className="stars-static"></div>
        <div className="stars-static"></div>
      </div>
    )
  }
}
