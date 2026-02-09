import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Locker } from '../entities/Locker';
import { getDistance } from '../utils/location';

const lockerRepository = AppDataSource.getRepository(Locker);

export const createLocker = async (req: Request, res: Response) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({
        message:
          'All fields (name, address, latitude, longitude) are required.',
      });
    }

    const newLocker = lockerRepository.create({
      name,
      address,
      latitude,
      longitude,
    });
    await lockerRepository.save(newLocker);
    res.status(201).json(newLocker);
  } catch (error) {
    console.error('Error creating locker:', error);
    res.status(500).json({ message: 'Failed to create locker.' });
  }
};

export const getLockers = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.query; // For distance calculation

    let lockers = await lockerRepository.find();

    if (latitude && longitude) {
      const userLat = parseFloat(latitude as string);
      const userLon = parseFloat(longitude as string);

      if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({
          message:
            'Invalid latitude or longitude provided for distance calculation.',
        });
      }

      // Calculate distance and sort
      lockers = lockers
        .map((locker) => ({
          ...locker,
          distance: getDistance(
            userLat,
            userLon,
            locker.latitude,
            locker.longitude,
          ),
        }))
        .sort((a, b) => a.distance - b.distance);
    }

    res.json(lockers);
  } catch (error) {
    console.error('Error fetching lockers:', error);
    res.status(500).json({ message: 'Failed to fetch lockers.' });
  }
};

export const getLockerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const locker = await lockerRepository.findOneBy({ id: id as string });

    if (!locker) {
      return res.status(404).json({ message: 'Locker not found.' });
    }

    res.json(locker);
  } catch (error) {
    console.error('Error fetching locker by ID:', error);
    res.status(500).json({ message: 'Failed to fetch locker.' });
  }
};
