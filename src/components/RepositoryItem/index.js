import './index.css'

const RepositoryItem = props => {
  const {eachLanguage} = props

  const {starsCount, forksCount, avatarUrl, issuesCount, name} = eachLanguage

  return (
    <li>
      <div className="repository-container">
        <img src={avatarUrl} alt={name} className="avatar-repository" />
        <h1 className="repository-name"> {name} </h1>
        <div className="icon-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p> {starsCount}</p>
        </div>
        <div className="icon-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p> {forksCount}</p>
        </div>
        <div className="icon-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p> {issuesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
