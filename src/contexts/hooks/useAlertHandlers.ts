
import { 
  toggleStreamAlert as toggleStreamAlertUtil, 
  updateStreamAlert as updateStreamAlertUtil 
} from '../alertUtils';
import { StreamAlert } from '../types';

type UseAlertHandlersProps = {
  setStreamAlerts: (alerts: StreamAlert[]) => void;
};

export const useAlertHandlers = ({ setStreamAlerts }: UseAlertHandlersProps) => {
  const toggleStreamAlert = (id: number) => {
    setStreamAlerts(prevAlerts => toggleStreamAlertUtil(prevAlerts, id));
  };

  const updateStreamAlert = (id: number, alert: Partial<StreamAlert>) => {
    setStreamAlerts(prevAlerts => updateStreamAlertUtil(prevAlerts, id, alert));
  };

  return { toggleStreamAlert, updateStreamAlert };
};
