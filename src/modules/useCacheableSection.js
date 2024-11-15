import { useCacheableSection as useCacheableSectionAppRuntime } from '@dhis2/app-runtime'
import { useD2 } from '@dhis2/app-runtime-adapter-d2'
import getCacheableSectionId from './getCacheableSectionId'
export const useCacheableSection = jupyterId => {
    const { d2 } = useD2()
    const cacheableSectionProps = useCacheableSectionAppRuntime(
        getCacheableSectionId(d2.currentUser.id, jupyterId)
    )
    return { ...cacheableSectionProps }
}