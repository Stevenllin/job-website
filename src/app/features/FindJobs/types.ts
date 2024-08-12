export interface Jobs {
  title: string;
  types: string;
  location: string;
  published: string;
  salary_max: number;
  salary_min: number;
  job_type: string;
  has_remote: boolean;
  company: Company;
}

export interface Company {
  name: string;
  logo: string;
  linkedin_url: string;
  website_url: string;
}
