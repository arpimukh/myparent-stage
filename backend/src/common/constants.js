const SERVICE_TYPES = {
        // CLEANING: 'cleaning',
        // COOKING: 'cooking',
        // MEDICAL_CARE: 'medical_care',
        // COMPANIONSHIP: 'companionship',
        // TRANSPORTATION: 'transportation',
        // ERRANDS: 'errands'
        DRIVER: 'driver',
        COOK: 'cook',
        CAR_WASH: 'car wash',
        MAID: 'maid',
        GARDENING: 'gardening',
        BATHROOM_CLEANING: 'bathroom cleaning'
      };

    const SERVICE_TYPE_CODE = {
        DRIVER: 'DV',
        COOK: 'CK',
        CAR_WASH: 'CW',
        MAID: 'MD',
        GARDENING: 'GD',
        BATHROOM_CLEANING: 'BC'
    };

    const SERVICE_TYPE_MAPPING = {
        [SERVICE_TYPE_CODE.DRIVER]: SERVICE_TYPES.DRIVER,
        [SERVICE_TYPE_CODE.COOK]: SERVICE_TYPES.COOK,
        [SERVICE_TYPE_CODE.CAR_WASH]: SERVICE_TYPES.CAR_WASH,
        [SERVICE_TYPE_CODE.MAID]: SERVICE_TYPES.MAID,
        [SERVICE_TYPE_CODE.GARDENING]: SERVICE_TYPES.GARDENING,
        [SERVICE_TYPE_CODE.BATHROOM_CLEANING]: SERVICE_TYPES.BATHROOM_CLEANING
    };
const SERVICES = [
  { id: 'DV', label: 'Driver', icon: <Car size={18} /> },
  { id: 'CK', label: 'Cook', icon: <Utensils size={18} /> },
  { id: 'CW', label: 'Car Wash', icon: <Droplets size={18} /> },
  { id: 'MD', label: 'Maid', icon: <User size={18} /> },
  { id: 'GD', label: 'Gardening', icon: <Leaf size={18} /> },
  { id: 'BC', label: 'Bathroom Cleaning', icon: <Sparkles size={18} /> },
];
      const SERVICE_STATUS = {
        PENDING: 'pending',
        ASSIGNED: 'assigned',
        IN_PROGRESS: 'in_progress',
        COMPLETED: 'completed',
        CANCELLED: 'cancel',
        ESCALATED: 'ESCALATED',
        OPEN: 'open',
        CLOSED: 'close'
      };