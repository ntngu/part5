const Message = ({ message }) => {
  if (message !== "") {
    return (
      <h2>{message}</h2>
    );
  }
}

export default Message;