import tw from 'tailwind-styled-components'

export const StyledWorkspaceGrid = tw.div`
grid grid-cols-3 gap-4 min-h-full pt-4 ml-4 mr-4
`

export const StyledButton = tw.button`
btn btn-outline btn-primary h-24 gap-2 uppercase
`

export const StyledCancelButton = tw.button`
btn btn-outline btn-error gap-2 uppercase
`

export const StyledWorkspace = tw.button`
btn btn-outline btn-secondary h-24 gap-2
`

export const StyledDialog = tw.dialog`
modal
`

export const StyledForm = tw.form`
!w-11/12 !max-w-5xl !h-[80%] 
modal-box
flex flex-col items-center justify-center
`

export const StyledFormWrapper = tw.div`
card max-w-[96%] md:max-w-[70%] shadow-2xl flex flex-col items-center bg-base-300 dark:bg-base-300-dark h-[70%] w-full
`
export const StyledFormHeader = tw.h2`
w-full 
h-14 
inline-flex 
items-center 
justify-center 
font-bold 
rounded-t-lg
uppercase
bg-accent 
text-accent-content
dark:bg-accent-dark
dark-text-accent-content-dark
`
