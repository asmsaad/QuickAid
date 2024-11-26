import React, { useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

export default function BasicDoc() {
    const [data] = useState([
        {
            label: "Argentina",
            expanded: true,
            children: [
                {
                    label: "Argentina",
                    expanded: true,
                    children: [
                        {
                            label: "Argentina",
                        },
                        {
                            label: "Croatia",
                        },
                    ],
                },
                {
                    label: "France",
                    expanded: true,
                    children: [
                        {
                            label: "France",
                        },
                        {
                            label: "Morocco",
                        },
                    ],
                },
            ],
        },
    ]);

    return (
        <PrimeReactProvider>
            <div className="card overflow-x-auto">
                <OrganizationChart value={data} collapsible={false} />
            </div>
        </PrimeReactProvider>
    );
}
