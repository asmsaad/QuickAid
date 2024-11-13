const developerMood = false;

export const logPrint = (name, print_parameters) => {
    if (developerMood) {
        const first_ = ["██", name, "\n"];
        if (print_parameters !== undefined) {
            if (Array.isArray(print_parameters)) {
                // Create a new array with newline characters
                const newArray = print_parameters.flatMap((item, index) => (index < print_parameters.length - 1 ? [item, "\n"] : [item]));
                const final_ = first_.concat(newArray);
                console.log(...final_);
            } else {
                const final_ = first_.concat([print_parameters]);
                console.log(...final_);
            }
        } else {
            console.log(...first_);
        }

        // console.log("██", name);
        // // Only log if print_parameters is provided
        // if (print_parameters !== undefined) {
        //     // Check if print_parameters is an array
        //     if (Array.isArray(print_parameters)) {
        //         print_parameters.forEach((data, index) => {
        //             if (index === print_parameters.length - 1) {
        //                 console.log(" └──> ", data); // Print other items normally
        //             } else {
        //                 console.log(" ├──> ", data); // Print last item with different format
        //             }
        //         });
        //     } else {
        //         // If it's a single value, just log it
        //         console.log(" └──> ", print_parameters);
        //     }
        // }
    }
};
