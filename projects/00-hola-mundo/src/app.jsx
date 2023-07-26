import './app.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

export function App(){


    return (
        < section className='App'>
            <TwitterFollowCard 
                userName={name} 
                name="3135715"
            />
            <TwitterFollowCard
                userName={name} 
                name="3135715"
            />

            <TwitterFollowCard
                userName={name}  
                name="3135715"
            />
            <TwitterFollowCard 
                userName={name}  
                name="3135715"
            />
            
        </section>
        
        
    )
}