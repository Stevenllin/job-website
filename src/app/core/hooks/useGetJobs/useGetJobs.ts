import  { useState, useEffect, useRef, useMemo } from "react";
import { Jobs } from '../../../features/FindJobs/types';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../../../core/services/firebaseService';
import commonService from "../../services/commonService";
import { DateFormatEnum } from "../../enums/date";

const useGetJobs = () => {
  const original = useRef<Jobs[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'jobs'), (snapshot) => {
      const results = snapshot.docs.map((doc) => doc.data() as Jobs).map(item => {
        return {
          ...item,
          published: commonService.convertDateFormat(item.published, DateFormatEnum.YYYYMMDD)
        }
      });
      original.current = results;
      setLoading(true);
    });
  
    return () => unsubscribe();
  }, []);
  
  const group_job_type = useMemo(() => {
    return commonService.groupData(original.current, 'job_type');
  }, [original.current]);
  
  const group_location = useMemo(() => {
    return commonService.groupData(original.current, 'location');
  }, [original.current]);
  
  const group_published = useMemo(() => {
    return commonService.groupData(original.current, 'published');
  }, [original.current]);

  return { original, loading, group_job_type, group_location, group_published };
}

export default useGetJobs;
