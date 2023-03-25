import './index.css'

const LanguageFilterItem = props => {
  const {getActiveLanguage, eachLanguageItem, isActive} = props

  const {id, language} = eachLanguageItem

  const activeLanguageBtn = isActive
    ? 'language-button activeBtn'
    : 'language-button'

  const onClickLanguageItem = () => {
    getActiveLanguage(id)
  }

  return (
    <li className="language-list">
      <button
        type="button"
        onClick={onClickLanguageItem}
        className={activeLanguageBtn}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
