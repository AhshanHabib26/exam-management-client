import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

interface SearchBtnProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  inputBelow: boolean;
}

const SearchBtn: React.FC<SearchBtnProps> = ({ setSearchTerm, inputBelow }) => {
  const [inputValue, setInputValue] = useState("");

  // Debounced function to update search term
  const debouncedUpdateSearchTerm = useMemo(
    () =>
      debounce((term: string) => {
        setSearchTerm(term);
      }, 300),
    [setSearchTerm]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedUpdateSearchTerm.cancel();
    };
  }, [debouncedUpdateSearchTerm]);

  // Handle input changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value); // Update local UI immediately

      // If empty, update search immediately
      if (!value.trim()) {
        setSearchTerm(""); // Ensure the parent component gets ""
      } else {
        debouncedUpdateSearchTerm(value);
      }
    },
    [debouncedUpdateSearchTerm, setSearchTerm] // Keep setSearchTerm as dependency
  );

  const handleReset = () => {
    setInputValue("");
    setSearchTerm("");
  }

  return (
    <div>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        {
          inputValue && <X onClick={handleReset} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 cursor-pointer" size={20} />
        }
        <Input
          value={inputValue} // Controlled input
          onChange={handleInputChange}
          type="text"
          className="pl-10 h-[45px] py-2 border border-gray-200 placeholder:text-gray-400 text-gray-600 hind-siliguri-regular rounded-md w-full"
          placeholder="এখানে খুজুন..."
        />
      </div>
      {inputBelow && (
        <span className="text-sm text-gray-400 hind-siliguri-light">
          বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান...
        </span>
      )}
    </div>
  );
};

export default SearchBtn;
