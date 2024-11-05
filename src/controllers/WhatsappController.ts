import { Request, Response } from "express";
import Url from "../models/ModelWhatsappLink";

export const whatsappLink = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Remove a URL existente, se houver
    await Url.deleteMany({});

    // Salva a nova URL
    const newUrl = new Url({ url });
    await newUrl.save();

    return res.json({
      id: newUrl._id,
      providedUrl: url,
    });
  } catch (error) {
    console.error("Error saving URL:", error);
    return res.status(500).json({ error: "Failed to save URL" });
  }
};

export const getUrl = async (req: Request, res: Response) => {
  try {
    const url = await Url.findOne({});

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.json({ id: url._id, url: url.url });
  } catch (error) {
    console.error("Error retrieving URL:", error);
    return res.status(500).json({ error: "Failed to retrieve URL" });
  }
};

export const updateUrl = async (req: Request, res: Response) => {
  const { newUrl } = req.body;

  if (!newUrl) {
    return res.status(400).json({ error: "New URL is required" });
  }

  try {
    const updatedUrl = await Url.findOne({});

    if (!updatedUrl) {
      return res.status(404).json({ error: "URL not found" });
    }

    updatedUrl.url = newUrl;
    await updatedUrl.save();

    res.status(200).json({ message: "URL updated successfully" });
  } catch (error) {
    console.error("Error updating URL:", error);
    return res.status(500).json({ error: "Failed to update URL" });
  }
};

export const deleteUrl = async (req: Request, res: Response) => {
  try {
    await Url.deleteMany({});

    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error("Error deleting URL:", error);
    return res.status(500).json({ error: "Failed to delete URL" });
  }
};
