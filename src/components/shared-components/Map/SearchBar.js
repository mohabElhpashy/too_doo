import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Select } from "antd";
function SearchBar({ postObject }) {
  const { Option } = Select;
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 26.8206, lng: () => 30.8025 },
      radius: 200 * 1000,
    },
  });
  return (
    <Select
      onPressEnter={(e) => e.preventDefault()}
      showSearch
      style={{ width: 200 }}
      defaultValue={value}
      value={value}
      placeholder="Select a City"
      onChange={(event) => setValue(event.target.value)}
    >
      {status === "OK" &&
        data?.map((element) => (
          <Option key={element.id} value={element.descritpion}>
            {element?.descritpion}
          </Option>
        ))}
    </Select>
  );
}

export default SearchBar;
