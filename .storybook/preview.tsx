import type { Preview } from "@storybook/react";
import React from "react";
import { Provider } from "react-redux";
import { withRouter } from "storybook-addon-react-router-v6";
import { store } from "../app/store"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme',
    defaultValue: 'light',
    toolbar: {
        icon: 'lightning',
        items: ['dark', 'light'],
        showName: true,
    },
  },
};

export const decorators = [
  withRouter,
  (Story, context) => {
    const theme = context.globals.theme === 'light' ? 'light' : 'dark';
    return (
      <Provider store={store}>
        <div id={theme}>
          <Story />
        </div>
      </Provider>

    )
  }
];

export default preview;
