"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { MagicWalletConnectors } from "@dynamic-labs/magic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DynamicContextProvider
          settings={{
            apiBaseUrl: "https://app.dynamic-preprod.xyz/api/v0",
            environmentId: "c9bc50df-2d95-4d9b-bcc7-7bd5acb1a470",
            walletConnectors: [MagicWalletConnectors],
          }}
        >
          {children}
        </DynamicContextProvider>
      </body>
    </html>
  );
}
