import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const ACCESS_KEY = "BHwDFizdIOXckpudJPL9lVhcRGTz62bVh2TbuxGNoPU";

export const fetchImages = async (searchQuery, currentPage) => {
  const response = await axios.get("search/photos", {
    params: {
      query: searchQuery,
      page: currentPage,
      per_page: 15,
      client_id: ACCESS_KEY,
      orientation: "landscape",
    },
  });

  return response.data;
};
