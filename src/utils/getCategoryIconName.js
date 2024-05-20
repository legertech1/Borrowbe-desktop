export const getCategoryIconName = (category) => {
  switch (category) {
    case "Jobs":
      return "briefcase-outline";
    case "Real Estate":
      return "home-outline";
    case "Car, Truck, RVs & Vehicles":
      return "car-outline";
    case "Services":
      return "construct-outline";
    case "Business & Industries":
      return "business-outline";
    case "Farm & Heavy Duty Equipment":
      return "hammer-outline";
    case "Travel, Vacation & Party Space":
      return "airplane-outline";
    case "Daily Rentals":
      return "cart-outline";
    case "Community & Sharing":
      return "people-outline";
    default:
      return "help-circle-outline";
  }
};
