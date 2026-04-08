// Utility functions for generating and managing ticket codes for complaint forms

export const generateTicketCode = (formKey, prefix) => {
  const existing = JSON.parse(localStorage.getItem(formKey) || '[]');
  
  // Count existing tickets with the same prefix
  let maxNumber = 0;
  existing.forEach((item) => {
    if (item.ticketCode && item.ticketCode.startsWith(prefix)) {
      const numberPart = parseInt(item.ticketCode.split('-')[1], 10);
      if (numberPart > maxNumber) {
        maxNumber = numberPart;
      }
    }
  });

  const newNumber = maxNumber + 1;
  const ticketCode = `${prefix}-${String(newNumber).padStart(3, '0')}`;
  
  return ticketCode;
};

export const saveFormDataWithTicket = (formKey, formData, ticketCode) => {
  const existing = JSON.parse(localStorage.getItem(formKey) || '[]');
  const newEntry = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ticketCode: ticketCode,
    status: 'proses',
    adminNote: '',
    ...formData
  };
  
  localStorage.setItem(
    formKey,
    JSON.stringify([newEntry, ...existing])
  );
  
  return ticketCode;
};
