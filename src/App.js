import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Message from "./components/Message";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const blog = {
        title: title,
        author: author,
        url: url,
      };
      const response = await blogService.create(blog);
      setBlogs([...blogs, response]);
      setMessage(`${title} ${author} added`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (err) {
      setMessage("");
      setTimeout(() => {
        setMessage("null");
      }, 5000);
    }
  };

  const usernameChange = ({ target }) => setUsername(target.value);
  const passwordChange = ({ target }) => setPassword(target.value);
  const titleChange = ({ target }) => setTitle(target.value);
  const authorChange = ({ target }) => setAuthor(target.value);
  const urlChange = ({ target }) => setUrl(target.value);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
    blogService
      .getAll()
      .then((blog) => setBlogs(blog))
      .catch((err) => console.log(err.response.data.error));
  }, []);

  if (!user) {
    return (
      <div>
        <Message message={message} />
        <Login
          handleLogin={handleLogin}
          usernameChange={usernameChange}
          passwordChange={passwordChange}
          username={username}
          password={password}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Message message={message} />
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
        <BlogForm
          handleCreate={handleCreate}
          titleChange={titleChange}
          authorChange={authorChange}
          urlChange={urlChange}
          title={title}
          author={author}
          url={url}
        />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
