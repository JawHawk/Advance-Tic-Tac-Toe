import React from "react";

const ResetContext = React.createContext(false);

const ResetProvider = ResetContext.Provider
const ResetConsumer = ResetContext.Consumer

export { ResetProvider, ResetConsumer}
export default ResetContext