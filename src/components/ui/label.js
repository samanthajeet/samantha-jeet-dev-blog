import { cx } from "@/utils/all";

export default function Label(props) {
    const color = {
        "#a3b18a": "text-[#a3b18a]",
        '#457b9d': "text-[#457b9d]",
        '#9f86c0': "text-[#9f86c0]",
        '#ee9b00': "text-[#ee9b00]",
    };

    const margin = props.nomargin;

    if (props.pill) {
        return (
            <div
                className={
                    "inline-flex items-center justify-center font-bold px-2 h-6 text-sm bg-blue-50 text-blue-500 rounded-full shrink-0 dark:bg-gray-800 dark:text-gray-300"
                }>
                {props.children}
            </div>
        );
    }

    return (
        <span
            className={cx(
                "inline-block text-xs font-medium tracking-wider uppercase ",
                !margin && " mt-5",
                color[props.color] || color["pink"]
            )}>
            {props.children}
        </span>
    );
}
