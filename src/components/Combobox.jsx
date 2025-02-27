import { useState, useRef, useId } from "react";

export const Combobox = ({ placeholder = "", data = [], elementToDisplay }) => {
  const [optionsArray, setOptionsArray] = useState(data);
  const [showPopover, setShowPopover] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const selectedRef = useRef(null);
  const inputRef = useRef(null);

  const filterOptions = (term) => {
    const filtered = data.filter((item) => {
      const itemValue = item[elementToDisplay]?.toLowerCase();
      return itemValue && itemValue.includes(term.toLowerCase());
    });

    setOptionsArray(filtered);
    setShowPopover(filtered.length ? true : false);
  };

  const onInputChanged = (event) => {
    setInputValue(event.currentTarget.value);
    filterOptions(event.currentTarget.value);
  };

  const setSelectedOption = (option) => {
    if (selectedRef?.current) selectedRef.current.ariaSelected = "false";
    option.ariaSelected = "true";
    selectedRef.current = option;
  };

  const onOptionSelect = (event) => {
    if (event.currentTarget.dataset.index) {
      const index = parseInt(event.currentTarget.dataset.index);
      setInputValue(optionsArray[index]?.value);
      setShowPopover(false);
      setSelectedOption(event.currentTarget);
      inputRef.current && inputRef.current.blur();
    }
  };

  const onInputFocused = () => {
    optionsArray.length && setShowPopover(true);
  };

  const onInputBlured = () => {
    setShowPopover(false);
  };

  const onPopoverMouseDown = (event) => {
    event.preventDefault();
  };

  const listboxId = useId();

  return (
    <div
      className={`relative inline-block w-full border border-custom-light-grey rounded-lg user-select-none ${
        showPopover ? "border-b-0 rounded-t-lg" : ""
      } ${showPopover ? "border-2 border-[#206af3]" : ""}`}
    >
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        className="appearance-none border-0 bg-transparent py-[15px] px-[20px] w-full text-base leading-none focus-visible:outline-none focus-visible:border-0 focus-visible:ring-0 placeholder-[#717171] placeholder-opacity-75"
        onFocus={onInputFocused}
        onChange={onInputChanged}
        onBlur={onInputBlured}
        ref={inputRef}
        aria-autocomplete="both"
        aria-controls={`listbox-${listboxId}`}
        aria-expanded={showPopover}
        aria-haspopup="listbox"
        aria-label={placeholder}
        role="combobox"
      />
      <ul
        className={`absolute left-[-2px] right-[-2px] top-full mt-0 p-0 m-0 text-left bg-white rounded-b-lg overflow-hidden ${
          showPopover ? "block" : "hidden"
        }`}
        id={`listbox-${listboxId}`}
      >
        {optionsArray.map((item, index) => (
          <li
            key={index}
            data-index={index}
            onClick={onOptionSelect}
            onMouseDown={onPopoverMouseDown}
            className="px-[20px] py-[8px] text-custom-dark-grey hover:bg-[#e8ecef] cursor-pointer"
            aria-selected="false"
            role="option"
          >
            {item[elementToDisplay]}
          </li>
        ))}
      </ul>
    </div>
  );
};
