import mongoose from "mongoose";

const requiredString = { type: String, required: true };
const requiredNumber = { type: Number, required: true }; 
const requiredDate   = { type: Date,   required: true };

const mediaSchema = new mongoose.Schema({
  file: {
    type: new mongoose.Schema({
      name:       requiredString,
      extension:  requiredString,
      size:       requiredNumber,
      createdAt:    requiredDate,
      modifiedAt:   requiredDate,
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
  deleted:  { type: Boolean,  required: true, default: false },
  views:    { type: Number,   required: true, default: 0 },
  tags:     { type: [String], required: true, default: [] },
  starred:  { type: Boolean, required: true, default: false },
  uploadedAt: { type: Date, required: true, default: Date.now },
  lastView: Date
});


export default mongoose.model<Media, mongoose.Model<Media>>('media', mediaSchema);

export interface Media extends mongoose.Document {
  id?: number;            // Unique (globally)
  file: FileAttribute;
  deleted: boolean;      // Default to false
  views: number;         // Default to 0
  tags: string[];        // Unique (cell-wise), Default to []
  starred: boolean;      // Default to false,
  uploadedAt: Date;
  lastView: Date;
}

export interface FileAttribute {
  name: string;
  extension: string;
  size: number;
  created: Date;
  modified: Date;
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
