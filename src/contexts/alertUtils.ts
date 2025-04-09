
import { StreamAlert } from './types';
import { toast } from '@/hooks/use-toast';

export const toggleStreamAlert = (
  alerts: StreamAlert[],
  id: number
): StreamAlert[] => {
  return alerts.map(alert => {
    if (alert.id === id) {
      const updatedAlert = { ...alert, enabled: !alert.enabled };
      
      toast({
        title: updatedAlert.enabled ? 'Alert Enabled' : 'Alert Disabled',
        description: `${alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} alerts are now ${updatedAlert.enabled ? 'enabled' : 'disabled'}`,
      });
      
      return updatedAlert;
    }
    return alert;
  });
};

export const updateStreamAlert = (
  alerts: StreamAlert[],
  id: number,
  updatedFields: Partial<StreamAlert>
): StreamAlert[] => {
  const result = alerts.map(alert => {
    if (alert.id === id) {
      const updatedAlert = { ...alert, ...updatedFields };
      return updatedAlert;
    }
    return alert;
  });
  
  toast({
    title: 'Alert Updated',
    description: 'Your stream alert settings have been updated',
  });
  
  return result;
};
