const configSwitcher = (environmentType: string) => {
  let configuration;

  switch (environmentType) {
    case "localhost":
      configuration = {
        API_URL: `http://localhost:3000/api/v1/`,
      };
      break;
    default:
      configuration = {
        API_URL: `http://localhost:3000/api/v1/`,
      };
  }

  return configuration;
};

export const config =
  typeof window !== "undefined"
    ? configSwitcher(window.location.hostname)
    : { API_URL: "", ImageUrl: "" };
