const InputButton = ({ placeholder, type }) => {
  return (
    <input
      className="w-3/4 h-[8%] rounded-md pl-1.5 shadow-md"
      type={type}
      placeholder={placeholder}
    />
  );
};
export default InputButton;
