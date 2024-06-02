import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const MultiSelect = (props: any) => {
  const { options, value, onChange, refetch } = props;
  const selectOptions = options.map((option: any) => ({
    value: option._id,
    label: option.name,
  }));
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={selectOptions}
      value={value}
      onChange={onChange}
      onFocus={refetch}
      className="items-center rounded-md border border-slate-200 bg-white text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300"
    />
  );
};

export default MultiSelect;
