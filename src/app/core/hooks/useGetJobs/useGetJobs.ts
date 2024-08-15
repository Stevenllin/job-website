import  { useState, useEffect, useRef } from "react";
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

      /** 將資料進行整合整理 */
      const group_job_type = commonService.groupData(results, 'job_type')
      const group_location = commonService.groupData(results, 'location')
      const group_published = commonService.groupData(results, 'published')

      console.log('results', results);
      console.log('group_job_type', group_job_type);
      console.log('group_location', group_location);
      console.log('group_published', group_published);
      setLoading(true);
    });

    return () => unsubscribe();
  }, []);

  return { original, loading }
}

export default useGetJobs;
