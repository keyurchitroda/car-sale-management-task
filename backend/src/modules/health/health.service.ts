export const getHealthStatus = async () => {
  return {
    status: "OK",
    timestamp: new Date().toISOString(),
  };
};
