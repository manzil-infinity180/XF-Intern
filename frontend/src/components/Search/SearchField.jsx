import { useEffect, useState } from "react";
import toast from "react-hot-toast"
import './SearchField.css'

import { useMutation } from "@tanstack/react-query"
import { autoCompleteFunc, searchField } from "../utils/http";
import Content from "../Content/Content";
function SearchField() {
  const [searchTerm, setSearchTerm] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const [suggestion, setSuggestion] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const { data, mutate } = useMutation({
    mutationFn: searchField,
    onSuccess: (data) => {
      toast.success(data.results.length + " results found");
    },
    onError: (error) => {

      if (error.info.err.includes('"text.query"')) {
        toast.error("Query should not be empty");
      } else {
        toast.error(error.info.err);
      }
    }
  });

  useEffect(() => {
    async function functionFetch(x) {
      const post = {
        searchfield: x
      };
      const user = await autoCompleteFunc(post);
      setAutoComplete(user.results);
    }
    if (searchTerm.length > 0) {
      functionFetch(searchTerm);
    }
  }, [searchTerm, trigger, autoComplete]);


  function handleSubmit(e) {
    e.preventDefault();
    const post = {
      searchfield: searchTerm
    };
    mutate(post);
    setSearchTerm("");
  }
  function handleSearchTerm(e) {
    setSearchTerm(e.target.value);
    setTrigger(s => !s);
    setSuggestion(s => !s);
  }
  function handleClickFunction(el) {
    setSearchTerm(el.name);
    toast.success("You can add more text for search");
    const post = {
      searchfield: searchTerm
    };
    setTimeout(() => {
      mutate(post);
    }, 500);
    setSearchTerm("");

  }


  return (
    <>
      <div className="search-box">
        <form
          onSubmit={handleSubmit}
          id="search-form">
          <div>
            <input
              style={{
                margin: "0 25%"
              }}
              id="search_field_class"
              className=" search_field_class mx-4 pl-12 lg:mx-0 flex items-center gap-4 w-2/4 my-0  rounded-[56px] bg-white/5 border border-white/[.25] backdrop-blur-xl py-4 px-5 z-10 text-lg text-white hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer"
              type="search"
              placeholder="Search Job/Internship . . ."
              value={searchTerm}
              onChange={handleSearchTerm}
              autoComplete='off'
            />

            {(autoComplete.length > 0 && searchTerm.length > 0 && !suggestion) && <ul>
              {
                autoComplete.map((el) =>
                  <div key={el._id} style={{
                    margin: "5px 25%"

                  }}
                    onClick={() => handleClickFunction(el)}
                    className="mx-2 pl-12 lg:mx-0 flex items-center gap-4 w-2/4 my-0  rounded-[6px] bg-white/5 border border-white/[.25] backdrop-blur-xl py-3 px-5 z-10 text-lg text-white hover:scale-[1.01] transition-all duration-200 ease-out cursor-pointer">
                    {el.name}</div>
                )
              }
            </ul>}

          </div>
          <button type="submit"
            className="submit_btn_input hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer">Search</button>
        </form>
      </div>
      {data && <div className="flex items-center flex-col justify-center ">
        <h1 className="text-center text-4xl font-bold tracking-wider">Search Results </h1>
        <h2 className="text-center text-1xl font-bold tracking-wider">Total Result Found : {data.results.length}</h2>
        {
          data && data.results.map((user) =>

            <Content data={user} key={user._id} />
          )
        }
        {
          data && data.results.length === 0 && <>
            <h1 style={{
              textAlign: "center",
              color: "#7f8ea3", letterSpacing: "0.1cm"
            }}>
              No Post found</h1>
          </>
        }
        <h1 className="text-center text-3xl tracking-wider">----------------------------</h1>
        <h1 className="text-center text-4xl font-bold tracking-wider">Other Openings</h1>

      </div>}
      <div>
        <div className="filter_search">
          <div className="search_bar3">
            <div className="search_content">

            </div>
            <div className="search_content">
              <div className="select__control select__control--is-focused css-1pahdxg-control">

              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default SearchField;