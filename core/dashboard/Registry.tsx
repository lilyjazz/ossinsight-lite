import { commands, dashboards, library } from '@/core/bind';
import { ReactiveDashboardInstance } from '@/core/dashboard/reactive-dashboard-instance';
import ClientEffect from '@/core/dashboard/Registry.client';
import { DashboardInstance } from '@/core/dashboard/type';
import { Dashboard, LibraryItem } from '@/utils/types/config';
import { singletons } from '@ossinsight-lite/ui/hooks/bind/context';

declare module '@ossinsight-lite/ui/hooks/bind' {
  interface CollectionsBindMap {
    dashboards: DashboardInstance;
    library: LibraryItem;
  }

  interface SingletonsBindMap {
    dashboard: DashboardInstance;
  }
}

function DashboardRegistry ({ name, dashboard: dashboardConfig, library: libraryItems, readonly }: { name: string, dashboard: Dashboard, library: LibraryItem[], readonly: boolean}) {
  dashboards.getOrCreate(name, () => [new ReactiveDashboardInstance(name, dashboardConfig)]);
  singletons.getOrCreate('dashboard', () => [new ReactiveDashboardInstance('canvas', dashboardConfig)]);
  library.inactiveScope(() => {
    for (let libraryItem of libraryItems) {
      library.getOrCreate(libraryItem.id ?? libraryItem.name, () => [libraryItem]);
    }
  })

  return <ClientEffect name={name} dashboard={dashboardConfig} library={libraryItems} readonly={readonly} />;
}

export default DashboardRegistry;
