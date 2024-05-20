import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apis from "../services/api";

export function updateRecentLocations(location) {
  if (!location) return;
  let recents = JSON.parse(window.localStorage.getItem("recentLocations"));
  if (!recents) recents = [];
  recents = recents?.filter((r) => r?.name != location?.name);
  if (recents?.length > 2) recents.pop();

  window.localStorage.setItem(
    "recentLocations",
    JSON.stringify([location, ...recents])
  );
}

export function getLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          }),
        (error) => {
          // alert(error.message);
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by your browser"));
    }
  });
}

export const fetchCurrentLocation = createAsyncThunk(
  "fetchCurrentLocation",
  async () => {
    try {
      const coordinates = await getLocation();
      if (!coordinates) {
        alert(coordinates.message);
      }
      let loc = await axios.get(apis.findMyLocation, {
        params: coordinates,
      });

      return loc.data;
    } catch (error) {}
  }
);

const locationSlice = createSlice({
  initialState: {
    selectedLocation: null,
    currentLocation: null,
  },
  name: "location",
  reducers: {
    setSelectedLocation: (state, action) => {
      updateRecentLocations(action.payload);
      return { ...state, selectedLocation: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentLocation.fulfilled, (state, action) => {
      if (!state.selectedLocation) {
        updateRecentLocations(action.payload);
        return {
          selectedLocation: action.payload,
          currentLocation: action.payload,
        };
      } else return { ...state, currentLocation: action.payload };
    });
  },
});

export default locationSlice;
export const { setSelectedLocation } = locationSlice.actions;
