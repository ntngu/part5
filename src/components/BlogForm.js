const BlogForm = ({ handleCreate, titleChange, authorChange, urlChange, title, author, url }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="text"
            name="Title"
            value={title}
            onChange={titleChange}
          ></input>
        </div>
        <div>
          author
          <input
            type="text"
            name="Author"
            value={author}
            onChange={authorChange}
          ></input>
        </div>
        <div>
          url
          <input
            type="text"
            name="Url"
            value={url}
            onChange={urlChange}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm;