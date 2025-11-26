import { Request, Response } from "express";

const ngoDatabase = {
  1: {
    id: 1,
    name: "Hope Foundation",
    description:
      "Hope Foundation is dedicated to reducing food waste and fighting hunger by connecting surplus food with people in need. We serve over 5000 meals daily across the city through our network of community kitchens and food distribution centers.",
    address: "123 Charity Street, Mumbai, Maharashtra 400001",
    phone: "+91 98765 43210",
    email: "contact@hopefoundation.org",
    website: "www.hopefoundation.org",
    services: [
      "Food Distribution",
      "Community Kitchen",
      "Emergency Relief",
      "Nutrition Programs",
      "Food Rescue",
    ],
    hours: "Mon-Sun: 8:00 AM - 8:00 PM",
    rating: 4.8,
    distance: "0.8 km",
    capacity: "High",
  },
  2: {
    id: 2,
    name: "Seva Trust",
    description:
      "Seva Trust focuses on sustainable food solutions and community development. We work with local farmers, restaurants, and volunteers to ensure no edible food goes to waste while supporting underprivileged communities.",
    address: "456 Service Road, Delhi 110001",
    phone: "+91 98765 43211",
    email: "info@sevatrust.org",
    website: "www.sevatrust.org",
    services: [
      "Food Recovery",
      "Community Meals",
      "Skill Development",
      "Agricultural Support",
      "Education Programs",
    ],
    hours: "Mon-Sat: 9:00 AM - 7:00 PM",
    rating: 4.6,
    distance: "1.2 km",
    capacity: "Medium",
  },
  3: {
    id: 3,
    name: "Care Center",
    description:
      "Care Center provides comprehensive support to homeless and low-income families through food assistance programs, shelter services, and rehabilitation programs. Our mission is to restore dignity through nourishment.",
    address: "789 Care Avenue, Bangalore, Karnataka 560001",
    phone: "+91 98765 43212",
    email: "care@carecenter.org",
    website: "www.carecenter.org",
    services: [
      "Shelter Meals",
      "Food Banks",
      "Rehabilitation",
      "Medical Support",
      "Counseling",
    ],
    hours: "24/7 Emergency Services",
    rating: 4.9,
    distance: "2.1 km",
    capacity: "High",
  },
};

export const getNGOs = async (req: Request, res: Response) => {
  try {
    const ngos = Object.values(ngoDatabase).map((ngo) => ({
      id: ngo.id,
      name: ngo.name,
      distance: ngo.distance,
      capacity: ngo.capacity,
      rating: ngo.rating,
    }));

    res.status(200).json({
      success: true,
      data: ngos,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNGODetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ngo = ngoDatabase[parseInt(id) as keyof typeof ngoDatabase];

    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: "NGO not found",
      });
    }

    res.status(200).json({
      success: true,
      data: ngo,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
