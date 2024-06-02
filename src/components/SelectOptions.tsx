import React, { useState } from "react";

import Select from "react-select";

export const SelectOptions = (props: any) => {
  const { options, value, onChange, onFocus, name, isLoading } = props;
  const selectOptions = options.map((option: any) => ({
    label: option.name,
    value: option._id,
  }));
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      isLoading={isLoading}
      isClearable={true}
      isSearchable={true}
      name={name}
      options={selectOptions}
      value={value}
      onChange={onChange}
    />
  );
};

export const SelectLand = (props: any) => {
  const { options, value, onChange, onFocus, name, isLoading } = props;
  const selectOptions = options?.map((option: any) => ({
    label: option.landUPI,
    value: option._id,
  }));
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      isLoading={isLoading}
      isClearable={true}
      isSearchable={true}
      name={name}
      options={selectOptions}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
};
