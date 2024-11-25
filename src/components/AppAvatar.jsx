import { Avatar, AvatarGroupItem, AvatarGroupPopover, AvatarGroup as FluentuiAvatarGroup } from "@fluentui/react-components";
import { NumberRowFilled } from "@fluentui/react-icons";
import { Box } from "@mui/material";

export const AvatarGroup = (props) => {
    // const type = props.type;
    // const size = props.size;
    const layout = props.layout ? props.layout : "spread"; //! OPTIONS WILLBE EITHER  "stack"  OR "spread"
    const size = props.size ? props.size : 24;
    const data = props.data;
    const show_more_display_side = props.show_more_display_side;
    // const show_more_display_side = "left";

    const handleChildClick = (event) => {
        // Prevents the click event from bubbling up to the parent div
        // event.stopPropagation();
        event.preventDefault();
        console.log("Child clicked");
    };

    return (
        <Box style={{ display: "flex" }} onClick={handleChildClick}>
            {/* <Box style={{ display: "flex", gap: type === "compact" ? undefined : "3px" }} onClick={handleChildClick}> */}
            {/* {Object.keys(data || {}).map((idx, index) => {
                return <Avatar key={index} color="colorful" name={data[idx]["name"]} size={size} style={{ marginLeft: type === "compact" ? "-9px" : undefined }} />;
            })} */}

            <FluentuiAvatarGroup layout={layout} size={size}>
                {show_more_display_side === "left" && Object.keys(data || {}).length > 5 && (
                    <>
                        <AvatarGroupPopover>
                            {Object.keys(data || {})
                                .slice(0, 5)
                                .map((key, index) => (
                                    <AvatarGroupItem key={index} name={data[key].name} image={{ src: data[key].url }}/>
                                ))}
                        </AvatarGroupPopover>
                    </>
                )}
                
                {/* <AvatarGroupItem name={"ASAD 1"} key={"ASAD 1"} />
                <AvatarGroupItem name={"ASAD 2"} key={"ASAD 2"} />
                <AvatarGroupItem name={"ASAD 3"} key={"ASAD 3"} />
                <AvatarGroupItem name={"ASAD 4"} key={"ASAD 4"} /> */}
                {Object.keys(data || {})
                    .slice(0, 5)
                    .map((key, index) => (
                        <AvatarGroupItem disabled key={index} name={data[key].name} image={{ src: data[key].url }}/>
                    ))}
                {show_more_display_side === "right" && Object.keys(data || {}).length > 5 && (
                    <>
                        <AvatarGroupPopover>
                            {Object.keys(data || {})
                                .slice(0, 5)
                                .map((key, index) => (
                                    <AvatarGroupItem key={index} name={data[key].name} image={{ src: data[key].url }} />
                                ))}
                        </AvatarGroupPopover>
                    </>
                )}
            </FluentuiAvatarGroup>
        </Box>
    );
};
