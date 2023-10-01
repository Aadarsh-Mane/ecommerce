import  mongoose from 'mongoose'

const purchaseHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  
});

const PurchaseHistory = mongoose.model('PurchaseHistory', purchaseHistorySchema);
export default PurchaseHistory;


