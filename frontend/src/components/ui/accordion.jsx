import React, { createContext, useContext, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const AccordionContext = createContext({});

const Accordion = ({ children, className, type = "single", collapsible = false, ...props }) => {
    const [value, setValue] = useState(props.defaultValue || (type === "multiple" ? [] : undefined));

    const handleValueChange = (itemValue) => {
        if (type === "single") {
            const newValue = itemValue === value ? (collapsible ? "" : value) : itemValue;
            setValue(newValue);
        } else {
            // Simple multiple implementation if needed, but we used single in HelpCenter
            // Skipping complex logic for now as HelpCenter uses single
        }
    };

    return (
        <AccordionContext.Provider value={{ value, onValueChange: handleValueChange }}>
            <div className={cn("", className)} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
};

const AccordionItem = React.forwardRef(({ className, value, ...props }, ref) => (
    <div ref={ref} className={cn("border-b", className)}>
        {/* Pass value explicitly or cloning children? 
            Actually, the Context pattern usually requires the Item to know its value.
            In shadcn/ui, AccordionItem gets a 'value' prop.
        */}
        <AccordionItemContext.Provider value={{ value }}>
            {props.children}
        </AccordionItemContext.Provider>
    </div>
));
AccordionItem.displayName = "AccordionItem";

const AccordionItemContext = createContext({});

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useContext(AccordionContext);
    const { value: itemValue } = useContext(AccordionItemContext);

    const isOpen = selectedValue === itemValue;

    return (
        <h3 className="flex">
            <button
                ref={ref}
                onClick={() => onValueChange(itemValue)}
                className={cn(
                    "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                    className
                )}
                data-state={isOpen ? "open" : "closed"}
                {...props}
            >
                {children}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </button>
        </h3>
    );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => {
    const { value: selectedValue } = useContext(AccordionContext);
    const { value: itemValue } = useContext(AccordionItemContext);
    const isOpen = selectedValue === itemValue;

    if (!isOpen) return null;

    return (
        <div
            ref={ref}
            className={cn(
                "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
                className
            )}
            data-state={isOpen ? "open" : "closed"}
            {...props}
        >
            <div className="pb-4 pt-0">{children}</div>
        </div>
    );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
