import '../componentStyles/searchStyles.css'

export default function Search ({search, handleSearch }) {
  return (
    <div className="search">
      <input type="text" value={search} placeholder="Search students" onChange={(e) => handleSearch(e)}/>
    </div>
  )
}