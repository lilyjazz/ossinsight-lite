import EnvironmentStatus from '@/components/pages/status/EnvironmentStatus';
import GithubPersonalStatus from '@/components/pages/status/GithubPersonalStatus';
import GithubRepoStatus from '@/components/pages/status/GithubRepoStatus';
import './style.scss';

export default function () {
  return (
    <div className="status-page p-4 mx-auto container">
      <h2>Checklist</h2>
      <EnvironmentStatus />
      <GithubPersonalStatus />
      <GithubRepoStatus />
    </div>
  );
}
