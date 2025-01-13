type CategoryConfigType = {
    color: string; // Header background color
    title: string; // Header title
    icon: string; // Header icon path
    textColor?: string; // Header text color
}

export const categoryConfig: Record<string, CategoryConfigType> = {
    gifts: {
        color: "#E24831",
        title: "Gifts",
        icon: "./images/Gifts.png",
    },
    travels: {
        color: "#FF93B8",
        title: "Travel",
        icon: "./images/Travel.png",
    },
    foodAndDrinks: {
        color: "#786DD3",
        title: "Food & Drinks",
        icon: "./images/Food.png",
    },
    entertainment: {
        color: "#2088E7",
        title: "Entertainment",
        icon: "./images/Entertainment.png",
    },
    decorations: {
        color: "#21C1E7",
        title: "Decorations",
        icon: "./images/Decorations.png",
    },
    costumesAndClothing: {
        color: "#63AB5C",
        title: "Costumes & Clothing",
        icon: "./images/Costumes.png",
    },
    stationeryAndPackaging: {
        color: "#EAC934",
        title: "Stationery & Packaging",
        icon: "./images/Card.png",
    },
    charitableContributions: {
        color: "#65328C",
        title: "Charitable Contributions",
        icon: "./images/Charity.png",
    }
} as const;
