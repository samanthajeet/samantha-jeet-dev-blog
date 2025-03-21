import Label from "../ui/label";
import { Category } from "../../types";

export default function CategoryLabel({
    categories,
    nomargin = false
}: {
    categories: Category[];
    nomargin?: boolean;
}) {
    return (
        <div className="flex gap-3">
            {categories?.length &&
                categories.slice(0).map((category, index) => (
                    <Label key={index} nomargin={nomargin} color={category.color}>
                        {category.title}
                    </Label>
                ))}
        </div>
    );
}
