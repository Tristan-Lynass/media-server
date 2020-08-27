import mongoose from 'mongoose';

/**
 * Obviously duplicating model information like this presents significant maintenance overhead.
 * Because the model of this project is not expected to grow significantly (famous last words), 
 * I've decided to go ahead with this approach.
 */

const requiredString  = { type: String,  required: true };
const requiredNumber  = { type: Number,  required: true }; 
const requiredDate    = { type: Date,    required: true };
const requiredBoolean = { type: Boolean, required: true };

const mediaSchema = new mongoose.Schema({
  file: {
    type: new mongoose.Schema({
      name:       requiredString,
      extension:  requiredString,
      size:       requiredNumber,
      // createdAt:  requiredDate,
      // modifiedAt: requiredDate,
      hash:       requiredString,
      temporal: new mongoose.Schema({
        duration: requiredNumber
      }),
      visual: new mongoose.Schema({
        width:    requiredNumber,
        height:   requiredNumber
      })
    }),
    required: true
  },
  deleted:      { ...requiredBoolean, default: false },
  views:        { ...requiredNumber, default: 0 },
  tags:         { type: [String], required: true, default: [] },
  starred:      { ...requiredBoolean, default: false },
  uploadedAt:   { ...requiredDate, default: new Date() },
  lastViewedAt: Date
});

export default mongoose.model<MediaDocument, mongoose.Model<MediaDocument>>('Media', mediaSchema);

interface MediaDocument extends Media, mongoose.Document {
}

export interface Media {
  // id?: number;            // Unique (globally)
  file: FileAttribute;
  deleted: boolean;      // Default to false
  views: number;         // Default to 0
  tags: string[];        // Unique (cell-wise), Default to []
  starred: boolean;      // Default to false,
  uploadedAt: Date;
  lastViewedAt?: Date;
}

export interface FileAttribute {
  name: string;
  extension: string;
  size: number;
  // createdAt: Date;
  // modifiedAt: Date;
  hash: string;
  temporal?: TemporalAttribute;
  visual?: VisualAttribute;
}

export interface TemporalAttribute {
  duration: number;
}

export interface VisualAttribute {
  width: number;
  height: number;
}
