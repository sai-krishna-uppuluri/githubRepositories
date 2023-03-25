import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusProgress = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: languageFiltersData[0].id,
    languageData: [],
    apiStatus: apiStatusProgress.initial,
  }

  renderLanguageFilterView = () => {
    const {activeLanguage} = this.state

    return (
      <ul className="language-list-view">
        {languageFiltersData.map(eachLanguageItem => (
          <LanguageFilterItem
            eachLanguageItem={eachLanguageItem}
            key={eachLanguageItem.id}
            getActiveLanguage={this.getActiveLanguage}
            isActive={eachLanguageItem.id === activeLanguage}
          />
        ))}
      </ul>
    )
  }

  getLanguageData = async () => {
    const {activeLanguage} = this.state
    console.log(activeLanguage)

    this.setState({
      apiStatus: apiStatusProgress.loading,
    })

    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.popular_repos.map(eachLanguageData => ({
        name: eachLanguageData.name,
        id: eachLanguageData.id,
        issuesCount: eachLanguageData.issues_count,
        forksCount: eachLanguageData.forks_count,
        starsCount: eachLanguageData.stars_count,
        avatarUrl: eachLanguageData.avatar_url,
      }))

      this.setState({
        languageData: updatedData,
        apiStatus: apiStatusProgress.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusProgress.failure,
      })
    }
  }

  getActiveLanguage = id => {
    this.setState(
      {
        activeLanguage: id,
      },
      this.getLanguageData,
    )
  }

  componentDidMount = () => {
    this.getLanguageData()
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {languageData} = this.state

    return (
      <ul className="repository-list-view">
        {languageData.map(eachLanguage => (
          <RepositoryItem eachLanguage={eachLanguage} key={eachLanguage.id} />
        ))}
      </ul>
    )
  }

  renderResultView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusProgress.success:
        return this.renderSuccessView()
      case apiStatusProgress.failure:
        return this.renderFailureView()
      case apiStatusProgress.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="app-main-heading"> Popular </h1>
        <div className="language-filter-container">
          {this.renderLanguageFilterView()}
        </div>
        <div className="result-container">{this.renderResultView()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
