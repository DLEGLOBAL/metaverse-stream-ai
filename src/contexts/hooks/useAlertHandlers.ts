
import { 
  toggleStreamAlert as toggleStreamAlertUtil, 
  updateStreamAlert as updateStreamAlertUtil 
} from '../alertUtils';
import { StreamAlert } from '../types';

type UseAlertHandlersProps = {
  setStreamAlerts: (alerts: StreamAlert[] | ((prev: StreamAlert[]) => StreamAlert[])) => void;
};

export const useAlertHandlers = ({ setStreamAlerts }: UseAlertHandlersProps) => {
  const toggleStreamAlert = (id: number) => {
    setStreamAlerts((prevAlerts: StreamAlert[]) => 
      toggleStreamAlertUtil(prevAlerts, id)
    );
  };

  const updateStreamAlert = (id: number, alert: Partial<StreamAlert>) => {
    setStreamAlerts((prevAlerts: StreamAlert[]) => 
      updateStreamAlertUtil(prevAlerts, id, alert)
    );
  };

  return { toggleStreamAlert, updateStreamAlert };
};
