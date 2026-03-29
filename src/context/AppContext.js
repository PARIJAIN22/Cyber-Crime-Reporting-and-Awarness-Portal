import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';

// Initial state
const initialState = {
  complaints: [
    {
      id: 'CYB001',
      type: 'Phishing',
      status: 'Action Taken',
      date: '2024-01-15',
      description: 'Received fake bank email',
      evidence: 'screenshot.png'
    },
    {
      id: 'CYB002',
      type: 'UPI Fraud',
      status: 'Under Review',
      date: '2024-01-20',
      description: 'Unauthorized UPI transaction',
      evidence: 'transaction.pdf'
    },
    {
      id: 'CYB003',
      type: 'Identity Theft',
      status: 'Filed',
      date: '2024-01-25',
      description: 'Someone using my identity online',
      evidence: 'profile_screenshot.jpg'
    }
  ],
  alerts: [],
  notifications: [],
  user: null,
  isLoading: false,
  error: null
};

// Action types
const ActionTypes = {
  ADD_COMPLAINT: 'ADD_COMPLAINT',
  UPDATE_COMPLAINT: 'UPDATE_COMPLAINT',
  DELETE_COMPLAINT: 'DELETE_COMPLAINT',
  SET_ALERTS: 'SET_ALERTS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_COMPLAINT:
      return {
        ...state,
        complaints: [...state.complaints, action.payload]
      };
    case ActionTypes.UPDATE_COMPLAINT:
      return {
        ...state,
        complaints: state.complaints.map(complaint =>
          complaint.id === action.payload.id
            ? { ...complaint, ...action.payload.updates }
            : complaint
        )
      };
    case ActionTypes.DELETE_COMPLAINT:
      return {
        ...state,
        complaints: state.complaints.filter(
          complaint => complaint.id !== action.payload
        )
      };
    case ActionTypes.SET_ALERTS:
      return {
        ...state,
        alerts: action.payload
      };
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators with useCallback for memoization
  const addComplaint = useCallback((complaint) => {
    const newComplaint = {
      ...complaint,
      id: `CYB${String(state.complaints.length + 1).padStart(3, '0')}`,
      status: 'Filed',
      date: new Date().toISOString().split('T')[0]
    };
    dispatch({ type: ActionTypes.ADD_COMPLAINT, payload: newComplaint });
    
    // Add notification
    dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      payload: {
        id: Date.now(),
        type: 'success',
        message: `Complaint ${newComplaint.id} filed successfully!`
      }
    });
    
    return newComplaint.id;
  }, [state.complaints.length]);

  const updateComplaint = useCallback((id, updates) => {
    dispatch({ type: ActionTypes.UPDATE_COMPLAINT, payload: { id, updates } });
  }, []);

  const deleteComplaint = useCallback((id) => {
    dispatch({ type: ActionTypes.DELETE_COMPLAINT, payload: id });
  }, []);

  const setAlerts = useCallback((alerts) => {
    dispatch({ type: ActionTypes.SET_ALERTS, payload: alerts });
  }, []);

  const addNotification = useCallback((notification) => {
    const id = Date.now();
    dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      payload: { ...notification, id }
    });
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
  }, []);

  const setUser = useCallback((user) => {
    dispatch({ type: ActionTypes.SET_USER, payload: user });
  }, []);

  const setLoading = useCallback((isLoading) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: isLoading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  }, []);

  // Memoize context value
  const value = useMemo(() => ({
    ...state,
    addComplaint,
    updateComplaint,
    deleteComplaint,
    setAlerts,
    addNotification,
    removeNotification,
    setUser,
    setLoading,
    setError,
    clearError
  }), [
    state,
    addComplaint,
    updateComplaint,
    deleteComplaint,
    setAlerts,
    addNotification,
    removeNotification,
    setUser,
    setLoading,
    setError,
    clearError
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
